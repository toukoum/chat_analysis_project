from datasets import load_dataset
import json
import sys

def main():
    """
    Usage: python jsonMaker.py <number_of_messages> <output_file>
    """
    if len(sys.argv) < 3:
        print("Usage: python jsonMaker.py <number_of_messages> <output_file>")
        return
    
    number_of_messages = int(sys.argv[1])
    output_file = sys.argv[2]
    
    ds = load_dataset("OpenAssistant/oasst2", split=f"train[70000:70010]")
    messages = [dict(ds[i]) for i in range(len(ds))]
    
    with open(output_file, "w") as json_file:
        json.dump({"messages": messages}, json_file, indent=2)

if __name__ == "__main__":
    main()
