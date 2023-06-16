import threading
def countdown(count):
    print(f'Thread alive? {thread.is_alive()}')
    print("Counting down...")
    while count > 0:
        print(f'{count} left')
        count -= 1
    print("We made it!")


thread = threading.Thread(target=countdown, args=(5,))

thread.start()
thread.join()

print(f'Thread still alive? {thread.is_alive()}')
print("End of program.")
