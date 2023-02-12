import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task! : Task;
  @Input() index! : number;

  ngOnInit(): void {
  }

  constructor(private data : DataService) {}

  checkDone(task : Task) {
    task.is_done = task.is_done == 'true' ? 'false' : 'true';
    this.data.updateTask(task);
  }

  deleteTask(task : Task) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      this.data.deleteTask(task);
    }
  }
}
