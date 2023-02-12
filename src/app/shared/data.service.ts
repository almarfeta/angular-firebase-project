import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  // add task
  addTask(task : Task) {
    task.id = this.afs.createId();
    return this.afs.collection('/Tasks').add(task);
  }

  // get all tasks
  getAllTasks() {
    return this.afs.collection('/Tasks').snapshotChanges();
  }

  // delete tasks
  deleteTask(task : Task) {
    return this.afs.doc('/Tasks/' + task.id).delete();
  }

  // update task
  updateTask(task : Task) {
    this.deleteTask(task);
    this.addTask(task);
  }
  
}
