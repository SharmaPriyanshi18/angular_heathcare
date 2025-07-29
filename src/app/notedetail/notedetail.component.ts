import { Component } from '@angular/core';

@Component({
  selector: 'app-notedetail',
  standalone:false,
  templateUrl: './notedetail.component.html',
  styleUrls: ['./notedetail.component.scss']
})
export class NotedetailComponent {
  selectedTab = 0;
  showReport = false;
  popupVisible = false;
  isEditMode = false;
  editingId: number | null = null;

  tabs = [
    { title: 'Assessment' },
    { title: 'Billing' }
  ];

  assessments = [
    {
      id: 1,
      patient: 'John Doe',
      case: 'Knee Pain',
      therapist: 'Dr. Smith',
      date: '2024-04-24',
      phoneNumber: '123-456-7890'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      case: 'Back Pain',
      therapist: 'Dr. Adams',
      date: '2024-04-25',
      phoneNumber: '987-654-3210'
    }
  ];

  selected: any = null;

  formModel: any = {
    patient: '',
    case: '',
    therapist: '',
    date: new Date(),
    phoneNumber: ''
  };

  onTabChange(index: number) {
    this.selectedTab = index;
    this.selected = null;
    this.showReport = false;
  }

  select(row: any) {
    this.selected = row;
    this.showReport = false;
  }

  add() {
    this.popupVisible = true;
    this.isEditMode = false;
    this.formModel = {
      patient: '',
      case: '',
      therapist: '',
      date: new Date(),
      phoneNumber: ''
    };
  }

  edit(row: any) {
    this.popupVisible = true;
    this.isEditMode = true;
    this.editingId = row.id;
    this.formModel = { ...row };
  }

  delete(row: any) {
    if (confirm(`Are you sure you want to delete the assessment for ${row.patient}?`)) {
      this.assessments = this.assessments.filter(a => a.id !== row.id);
      if (this.selected?.id === row.id) {
        this.selected = null;
        this.showReport = false;
      }
    }
  }

  saveAssessment() {
    if (
      !this.formModel.patient ||
      !this.formModel.case ||
      !this.formModel.therapist ||
      !this.formModel.date ||
      !this.formModel.phoneNumber
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditMode) {
      this.assessments = this.assessments.map(item =>
        item.id === this.editingId ? { ...this.formModel, id: this.editingId } : item
      );
    } else {
      const newId = Math.max(...this.assessments.map(a => a.id), 0) + 1;
      this.assessments.push({ ...this.formModel, id: newId });
    }

    this.popupVisible = false;
    this.selected = null;
    this.formModel = {
      patient: '',
      case: '',
      therapist: '',
      date: new Date(),
      phoneNumber: ''
    };
  }

  // Used in dx-button to access row properly
  onEditClick = (e: any) => {
    this.edit(e.row.data);
  };

  onDeleteClick = (e: any) => {
    this.delete(e.row.data);
  };

  printReport() {
    const content = `
      <h3>Patient Report</h3>
      <p><strong>Patient:</strong> ${this.selected.patient}</p>
      <p><strong>Case:</strong> ${this.selected.case}</p>
      <p><strong>Therapist:</strong> ${this.selected.therapist}</p>
      <p><strong>Date:</strong> ${this.selected.date}</p>
      <p><strong>Phone:</strong> ${this.selected.phoneNumber}</p>
      <p><strong>Assessment Notes:</strong> Lorem ipsum dolor sit amet...</p>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>Report</title></head><body>${content}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
