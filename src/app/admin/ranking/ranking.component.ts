import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit, AfterViewChecked {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;


  @ViewChild('tableWrapper') tableWrapper;
  private currentComponentWidth;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor() {
    this.fetch((data) => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  ngAfterViewChecked() {
    // Check if the table size has changed,
    // if (this.table && this.table.recalculate && (this.tableWrapper.nativeElement.clientWidth !== this.currentComponentWidth)) {
    //   this.currentComponentWidth = this.tableWrapper.nativeElement.clientWidth;
    //   this.table.recalculate();
    //   this.changeDetectorRef.detectChanges();
    // }
    if (this.table && this.table.recalculate && (this.tableWrapper.nativeElement.clientWidth !== this.currentComponentWidth)) {
      this.currentComponentWidth = this.tableWrapper.nativeElement.clientWidth;
      this.table.recalculate();
      window.dispatchEvent(new Event('resize'));
    }
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', '../../assets/data/company.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  ngOnInit() {
  }

}
