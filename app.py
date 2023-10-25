<<<<<<< HEAD
# run.py
||||||| fbc9b6c
from flask import Flask, render_template, request
import json
import os
import backend
=======
from flask import Flask, render_template, request
import json
import os
#import backend
>>>>>>> 7eb4164f65d34c46978a20b17ef93c802569928c

from back_end.__init__ import app

if __name__ == '__main__':
    app.run(debug=True)
