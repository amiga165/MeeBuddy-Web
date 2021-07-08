import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../_services/user.service";
import { DataService } from "../../_services/data.service";
@Component({
  selector: 'app-profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.scss']
})
export class ProfileformComponent implements OnInit {

  update: FormGroup;

  constructor(
	private fb: FormBuilder,
	private user: UserService,
	private dataService: DataService
	) { }

  ngOnInit(): void {
	this.update = this.fb.group({
		name: [""],
		email: ["",Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]
	});
  }

  get f() { return this.update.controls; }

  updateUser() {
	this.user.updateUser(this.update.value).then(res => {
		if (res) {

			let val = this.update.value;
			
			this.dataService.userData.info = {

						...this.dataService.userData.info,
						name: val.name,
						email: val.email

						};
		}
	});
  }
}
