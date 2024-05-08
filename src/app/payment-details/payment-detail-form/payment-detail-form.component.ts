import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [],
})
export class PaymentDetailFormComponent {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      this.service.postPaymentDetail().subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success(
            'Inserted successfully',
            'Payment Detail Register'
          );
          this.service.refreshList();
          this.service.resetForm(form);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
