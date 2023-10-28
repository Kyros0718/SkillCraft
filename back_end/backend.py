"""
This is the backend for SkillCraft. 
"""

global DEBUG
DEBUG = True
import openai
from back_end import apikey
from typing import List


key = apikey.API_KEY
def generate_project_ideas(skill: str, level: str) -> List[str]:
    """
    Generate steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Configure OpenAI API
    openai.api_key = key
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
    if DEBUG: print(
            f"""
            \nideas debug:\n
            {ideas}
            \ntype:{type(ideas)}\n
            response JSON\n
            {str(response)}
            \n
            """
    )
    return ideas

#@app.route('/generate_project_description', methods=['POST'])
def generate_project_description(idea: str) -> str:
    """
    Gives the description of a project.

    Returns:
        A String, with the description.
    """
    # Configure OpenAI API
    openai.api_key = key
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
    if DEBUG: print(
            f"""
            \ndesciprtion debug:\n
            {description}
            \ntype:{type(description)}\n
            response JSON\n
            {str(response)}
            \n
            """
    )
    return description

#@app.route('/generate_steps', methods=['POST'])
def generate_steps(project: str, description: str) -> List[str]:
    """
    Generate steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Configure OpenAI API
    openai.api_key = key
    # Define the prompt for the current project idea and description
    prompt = f"""
            Generate a list of 5 steps to complete the 
            project '{project}' with the description '{description}'
            """
    
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
    #steps = []
    steps = response.choices[0].text.strip().split("\n")
    TEST = response.choices[0].text.strip().split("\n")

    # Append each output to the list of steps
    # for choice in response.choices:
    #     steps.append(choice.text.strip())

    # Return the list of steps
    if DEBUG: print(
            f"""
            \nsteps debug:\n
            {steps}
            \ntype:{type(steps)}\n
            response JSON\n
            {str(response)}
            \n
            {TEST}
            \n
            """
    )
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



    openai.api_key = key
    prompt = f"""
            Provide a walkthrough of 5 steps on how to complete 
            the step '{step}' for the project '{project}' 
            with the description '{description}' 
            """
    
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
    walkthrough = response.choices[0].text.strip().split("\n")

    # Return the walkthrough
    if DEBUG: print(
            f"""
            \nwalkthrough debug:\n
            {step}, {project}\n
            {description}\n
            {walkthrough}
            \ntype:{type(walkthrough)}\n
            response JSON\n
            {str(response)}
            \n
            """
    )
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
        # Append the new list to the main list of walkthroughs
        walkthroughs.append(walkthrough)


    # Return the list of walkthroughs
    if DEBUG: print(
            f"""
            \nwalkthrough debug:\n
            {walkthroughs}
            \ntype:{type(walkthroughs)}\n
            response JSON\n
            """
    )
    return walkthroughs
