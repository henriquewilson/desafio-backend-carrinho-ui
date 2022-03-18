import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-create-cart',
  templateUrl: './form-create-cart.component.html'
})
export class FormCreateCartComponent implements OnInit {

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      email: [, Validators.required],
    });
  }

  ngOnInit(): void {
  }


  save(): void {
    if (this.form.valid) {
      this.activeModal.close(this.form.get('email')?.value);
    } else {
      this.toastr.warning('Preencha o campos corretamente', 'Incompleto!');
    }
  }

}
