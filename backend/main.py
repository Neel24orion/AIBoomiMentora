from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import json, os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/lessons/{track}")
async def get_lessons(track: str):
    if track not in ["chatgpt"]:
        return {"lessons": []}

    return {
        "lessons": curriculum["lessons"]
    }
@app.get("/tasks/{track}")
async def get_tasks(track: str):
    lesson_tasks = []

    for lesson in curriculum["lessons"]:
        for i in range(1, 4):   # 3 tasks per lesson (example)
            lesson_tasks.append({
                "label": f"{lesson['title']} Task {i}"
            })

    return {"tasks": lesson_tasks}


client = OpenAI(
    base_url="https://go.fastrouter.ai/api/v1",
    api_key=os.getenv("FASTROUTER_API_KEY"),
)

# -------- LOAD CURRICULUM --------
with open("curriculum/chatgpt.json") as f:
    curriculum = json.load(f)

# -------- USER PROGRESS (STATIC SIMULATION) --------
user_progress = {
    "lesson": 1,
    "task": 1,
    "score": 0
}
# -------- CURRENT TASK CONTEXT --------
current_task_context = {
    "task_text": "",
    "lesson_title": "",
    "lesson_topics": []
}


class TaskRequest(BaseModel):
    track: str

class EvalRequest(BaseModel):
    prompt: str
    output: str


# -------- PROMPT BUILDER --------
def build_system_prompt(track):
    lesson_id = user_progress["lesson"]
    task_no = user_progress["task"]
    score = user_progress["score"]

    lesson = curriculum["lessons"][lesson_id - 1]

    return f"""
You are an AI Learning Mentor.

Track: {track}
Lesson: {lesson['title']}
Lesson Description: {lesson['description']}
Topics: {', '.join(lesson['topics'])}

User State:
- Task Number: {task_no}
- Previous Score: {score}/10

Rules:
- Practical real-world task
- ONE TASK ONLY
- Increasing difficulty
- No theory
- Focus only on current lesson topics
- Clear instructions
"""


# -------- GENERATE TASK --------
@app.post("/generate-task")
async def generate_task(data: TaskRequest):

    lesson_id = user_progress["lesson"]
    lesson = curriculum["lessons"][lesson_id - 1]

    system_prompt = build_system_prompt(data.track)

    completion = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "Generate ONE practical task"}
        ]
    )

    task_text = completion.choices[0].message.content

    # STORE TASK CONTEXT
    current_task_context["task_text"] = task_text
    current_task_context["lesson_title"] = lesson["title"]
    current_task_context["lesson_topics"] = lesson["topics"]

    return {"task": task_text}

def get_evaluation_criteria(lesson_title):
    if lesson_title == "Core Basics":
        return "Clarity, Specificity, Role Assignment, Output Format, Conciseness"
    if lesson_title == "Prompt Formulation":
        return "Persona, Context, Clear Task, Examples, Iteration"
    if lesson_title == "Advanced Patterns":
        return "Zero/Few Shot Usage, Logical Flow, Template Reusability"
    if lesson_title == "Practical Applications":
        return "Real-world Usefulness, Output Quality, Follow-ups"
    if lesson_title == "Best Practices and Ethics":
        return "Bias Reduction, Verification, Responsible Use"


def build_evaluation_prompt(user_prompt, user_output):

    criteria = get_evaluation_criteria(
        current_task_context["lesson_title"]
    )

    return f"""
You are a friendly AI Mentor helping a student learn prompt engineering.

Speak like a supportive human teacher.
Be encouraging, not robotic.
Do NOT be harsh.
Use simple conversational tone.
Address the student as "you".

TASK GIVEN:
{current_task_context["task_text"]}

CURRENT LESSON:
{current_task_context["lesson_title"]}

LESSON TOPICS:
{', '.join(current_task_context["lesson_topics"])}

EVALUATION FOCUS:
{criteria}

USER PROMPT:
{user_prompt}

LLM OUTPUT:
{user_output}

Now evaluate like a mentor.

Return format EXACTLY like this:

Score: X/10

What You Did Well:
- ...

What You Missed:
- Mention which lesson concepts were missing

How To Improve:
- Concrete steps user can take
- Example mini prompt if needed

Next Skill To Focus:
- Mention next lesson topic or technique

Tone Rules:
- Encourage progress
- Avoid negativity
- Be specific
- Sound human, not AI
"""



# -------- EVALUATE --------
@app.post("/evaluate")
async def evaluate(data: EvalRequest):

    eval_prompt = build_evaluation_prompt(
        data.prompt,
        data.output
    )

    completion = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[{"role": "user", "content": eval_prompt}]
    )

    evaluation = completion.choices[0].message.content

    # SIMULATE PROGRESS UPDATE
    user_progress["task"] += 1
    if user_progress["task"] > 3:
        user_progress["lesson"] += 1
        user_progress["task"] = 1

    return {"evaluation": evaluation}
