export class Task {
  private id: number;
  private taskDur: durationObj;
  private progress: boolean;
  private isDone: boolean;
  constructor(id: number) {
    this.id = id;
  }
  public setId(id: number) {
    this.id = id;
  }

  public static create_plain_object() {
    return {};
  }
}

interface durationObj {
  sec: number;
  min: number;
  hr: number;
}

interface plainTask {}
