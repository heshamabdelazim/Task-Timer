export class Task {
  static nextID = 1;
  private id: number;
  private taskName: String;
  private startTime: number = 0;
  private endTimeAfter: number = 0;
  private progress: boolean = false;
  private isDone: boolean = false;

  constructor(taskName: String) {
    this.id = Task.nextID++;
    this.taskName = taskName;
  }

  public static create_plain_object(taskName: String): {} {
    return { ...new Task(taskName) };
  }
}
