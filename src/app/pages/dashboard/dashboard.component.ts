import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskList : Task[] = [];
  taskObject : Task = {
    id: '',
    date: '',
    time: '',
    task_name: '',
    description: '',
    is_done: '',
    user_email: ''
  };
  id : string = '';
  date : string = '';
  time : string = '';
  task_name : string = '';
  description : string = '';
  is_done : string = '';
  user_email : string = '';

  constructor(private auth : AuthService, private data : DataService) { }
  
  ngOnInit(): void {
    this.user_email = localStorage.getItem('email')!;
    this.getAllTasks();
  }

  logout() {
    this.auth.logout();
  }

  getAllTasks() {
    this.data.getAllTasks().subscribe(res => {
      this.taskList = res
        .filter((e: any) => e.payload.doc.data().user_email === this.user_email)
        .map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
    }, () => {
      alert('Error while fetching data');
    });
    
  }

  addTask() {
    if (this.task_name == '') {
      alert('Please provide a task name');
      return;
    }

    this.taskObject.id = '';
    this.taskObject.date = this.date == '' ? 'No time' : this.date;
    this.taskObject.time = this.time == '' ? 'No date' : this.time;
    this.taskObject.task_name = this.task_name;
    this.taskObject.description = this.description == '' ? 'No description' : this.description;
    this.taskObject.is_done = 'false';
    this.taskObject.user_email = localStorage.getItem('email')!;

    this.data.addTask(this.taskObject);

    this.date = '';
    this.time = '';
    this.task_name = '';
    this.description = '';
  }
}
