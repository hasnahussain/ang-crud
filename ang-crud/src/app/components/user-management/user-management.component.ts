import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  users: User[] =[];
  selectedUser: User = { name: '', email: '' };

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.loadUsers();

  }
  loadUsers(): void{
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  addUser(): void{
    if(this.selectedUser.name && this.selectedUser.email){
      this.userService.createUser(this.selectedUser).subscribe(() =>{
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  editUser(user: User): void{
    this.selectedUser = { ...user };
  }

  updateUser(): void{
    if(this.selectedUser.id){
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  deleteUser(id: number | undefined): void{
    if(id){
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  resetForm(): void {
    this.selectedUser = { name: '', email: ''};
  }
}
