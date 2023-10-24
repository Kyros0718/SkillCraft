"""
This is the backend for SkillCraft. 
"""

global DEBUG
DEBUG = True
import openai
from typing import List
def generate_project_ideas(skill: str, level: str) -> List[str]:
    """
    Generate steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Configure OpenAI API
    openai.api_key = 'YOUR_KEY_HERE'
    prompt = f"Generate 10 project ideas that involve {skill} at a {level} level and save it as a Python list."
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )

    ideas = response.choices[0].text.strip().split("\n")
    if DEBUG: print(ideas)
    return ideas

#@app.route('/generate_project_description', methods=['POST'])
def generate_project_description(idea: str) -> str:
    """
    Gives the description of a project.

    Returns:
        A String, with the description.
    """
    # Configure OpenAI API
    openai.api_key = 'YOUR_KEY_HERE'
    prompt = f"Generate a project description for a {idea}."
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )
    description = response.choices[0].text.strip()
    if DEBUG: print(description)
    return description

#@app.route('/generate_steps', methods=['POST'])
def generate_steps(project: str, description: str) -> List[str]:
    """
    Benerate steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Configure OpenAI API
    openai.api_key = 'YOUR_KEY_HERE'
    # Define the prompt for the current project idea and description
    prompt = f"Generate a list of steps to complete the project '{project}' and {description} and save each step to a Python list."
    
    # Generate text using OpenAI's Completion module
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Create an empty list to store the steps
    steps = []

    # Append each output to the list of steps
    for choice in response.choices:
        steps.append(choice.text)

    # Return the list of steps
    if DEBUG: print(steps)
    return steps


import openai
def generate_walkthrough(project: str, description: str, step: str) -> List[str]:
    """
    Generate further steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Define the prompt for the current step
    # Configure OpenAI API
    openai.api_key = 'YOUR_KEY_HERE'
    prompt = f"Provide a walkthrough of how to complete the step '{step}' for the project '{project}' with the description '{description}'
      and save it as a Python list."
    
    # Generate text using OpenAI's Completion module
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1000,
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Extract the walkthrough from the response
    walkthrough = response.choices[0].text.strip()

    # Return the walkthrough
    if DEBUG: print(walkthrough)
    return walkthrough

def generate_walkthroughs(project: str) -> List[str]:
    """
    Generate the walkthrough on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    description = generate_project_description(project)
    steps = generate_steps(project, description)
    # Create an empty list to store the walkthroughs
    walkthroughs = []
    

    # Generate a walkthrough for each step
    for step in steps:
        # Generate the walkthrough for the current step
        walkthrough = generate_walkthrough(project, description, step)
        # Create a new list for the current walkthrough
        current_walkthrough = walkthrough
        # Append the new list to the main list of walkthroughs
        walkthroughs.append(current_walkthrough)


    # Return the list of walkthroughs
    if DEBUG: print(walkthroughs)
    return walkthroughs
