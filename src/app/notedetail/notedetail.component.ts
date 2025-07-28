import { Component } from '@angular/core';

@Component({
  selector: 'app-notedetail',
  standalone: false,
  templateUrl: './notedetail.component.html',
  styleUrl: './notedetail.component.scss'
})
export class NotedetailComponent {
filter = {
    dosFrom: new Date(),
    dosTo: new Date(),
    dateRange: 'Last Two Years',
    caseType: ''
  };

  years = ['Last Year', 'Last Two Years', 'Custom'];
  caseTypes = ['All', 'Legal', 'Medical'];

  columns = ['Title', 'Count', 'Amount'];

  referralData = [
    { Title: 'Summary of Referral Activities', Count: 708, Amount: 0 },
    { Title: 'Center For Medical Record Requests Not Sent > 30 Days', Count: 94, Amount: 0 }
  ];

  arData = [
    { Title: 'Summary Insurance Aged Report', Count: 2158, Amount: 871082.67 }
  ];

  followUpData = [
    { Title: 'Collection Action For Claims Over 30 Days', Count: 6, Amount: 0 }
  ];

  loadData() {
    // Call API to load actual data using filters
    console.log(this.filter);
  }

  ngOnInit() {
    this.loadData();
  }
}
