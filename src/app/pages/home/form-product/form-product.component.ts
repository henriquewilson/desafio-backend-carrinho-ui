import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  @Input() name: string | undefined;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
      description: [, Validators.required]
    });
  }

  ngOnInit(): void {
  }


  save(): void {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    } else {
      this.toastr.warning('Preencha o campos corretamente', 'Incompleto!');

    }
  }

}
