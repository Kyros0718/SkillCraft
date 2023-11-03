"""
This is the backend for SkillCraft. 
"""

global DEBUG
DEBUG = True
import openai
import os
from typing import List


key = os.environ.get("API_KEY")
def generate_project_ideas(skill: str, level: str) -> List[str]:
    """
    Generate steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Configure OpenAI API
    openai.api_key = key
    project_idea_num = 10 #change number of ideas here
    prompt = f"""
    ###Instructions###
    Save each idea unnumbered in a Python list. Do not add any descriptions. Only output the list.
    Q: Generate 10 programming project ideas that involve Python at an advanced level.
    A: ["Build a Movie Recommender System", "American Signal Language Recognition", "Real-time license plate recognition", "Sentiment Analysis in Stock News Headlines", "SMS Spam Detection", "Network Analysis of Game of Thrones",  "Reducing Traffic Mortality with Machine Learning", "Movie Similarity in Plot Summaries", "Movie Genre Classification with Multi-Label Output", "Build and Deploy a Machine Learning Pipeline"]
    Q: Generate {project_idea_num} programming project ideas that involve {skill} at a {level} level.
    A:
    """
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )

    ideas = [response.choices[0]]
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

def generate_project_description(idea: str) -> str:
    """
    Gives the description of a project.

    Returns:
        A String, with the description.
    """
    # Configure OpenAI API
    openai.api_key = key
    prompt = f"""
    ###Instructions###
    Save only the description as a Python String, unnumbered. Make the description 4 sentences. Only output the String.
    Q: Generate descriptions for each project idea in the following idea: {idea}
    A:
    """
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


def generate_steps(project: str, description: str, level: str, skill: str) -> List[str]:
    """
    Generate steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Configure OpenAI API
    openai.api_key = key
    # Define the prompt for the current project idea and description
    step_num = 5
    prompt = f"""
    ###Instructions###
    Append only the steps in a Python list, unnumbered. Only output the list.
    Knowledge: A user is trying to develop the project: "{project}" with the following description: "{description}" The user is a {level} trying to use {skill}.
    Q: Generate {step_num} steps to develop the project.
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

def generate_walkthrough(project: str, description: str, step: str, skill: str, level: str, step_num: int) -> List[str]:
    """
    Generate further steps on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    # Define the prompt for the current step
    # Configure OpenAI API


    walkthrough_num = 5
    openai.api_key = key
    prompt = f"""
    ###Instructions###
    Generate {walkthrough_num} steps. Append only the steps in a Python list, unnumbered. Only output the list. 
    Knowledge: The user is a {level} tstep_num_of_projectrying to use {skill}. The user is trying to develop the project: {project} with the following description: {description} The user is on the following step: "{step_num}: {step}"
    Q: Provide a walk-through on how to complete this step.
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
    # walkthrough = response.choices[0].text.strip().split("\n")
    walkthrough = [response.choices[0]]

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

def generate_walkthroughs(project: str, skill: str, level: str) -> List[str]:
    """
    Generate the walkthrough on how to do the project.

    Returns:
        A list with strings, with the steps.
    """
    description = generate_project_description(project)
    steps = generate_steps(project, description, level, skill)
    # Create an empty list to store the walkthroughs
    walkthroughs = []
    

    # Generate a walkthrough for each step
    for i in range(0, len(steps)):
        # Generate the walkthrough for the current step
        step_num = i + 1
        walkthrough = generate_walkthrough(
            project, 
            description, 
            steps[i], 
            skill, 
            level, 
            step_num
        )
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
