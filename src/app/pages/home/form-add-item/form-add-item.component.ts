import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../../core/model/product";
import {Item} from "../../../core/model/item";

@Component({
  selector: 'app-form-add-item',
  templateUrl: './form-add-item.component.html'
})
export class FormAddItemComponent implements OnInit {

  @Input() product: Product | undefined;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      unitPrice: [, Validators.required],
      quantity: [, Validators.required]
    });
  }

  ngOnInit(): void {
  }


  save(): void {
    if (this.form.valid) {
      this.activeModal.close({product: this.product, quantity: this.form.get('quantity')?.value, unitPrice: this.form.get('unitPrice')?.value} as Item);
    } else {
      this.toastr.warning('Preencha o campos corretamente', 'Incompleto!');
    }
  }
}
