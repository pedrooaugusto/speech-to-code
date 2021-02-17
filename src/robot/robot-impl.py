import pyautogui
import time
import sys

class Robot:
    # keyboard
    def write(self, text):
        pyautogui.write(text)

    def press(self, key):
        pyautogui.press(key)
    
    def hotKey(self, *args):
        pyautogui.hotkey(*args)


robot = Robot()
args = sys.argv[1:]

if args[0] == "write":
    if len(args) == 2:
        robot.write(args[1])
    else:
        raise Exception("Write takes only one argument!")

if args[0] == "press":
    if len(args) == 2:
        robot.press(args[1])
    else:
        raise Exception("Press takes only one argument!")

if args[0] == "hotKey":
    if len(args) > 1:
        robot.hotKey(*args[1:])
    else:
        raise Exception("hotKey takes at least one argument")
