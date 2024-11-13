import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-and-filter',
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.scss'],
})
export class SearchAndFilterComponent {
  searchTerm: string = '';
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchTermChange() {
    this.searchTermChange.emit(this.searchTerm); 
  }

  updateSearchTerm() {
    this.searchTermChange.emit(this.searchTerm);
  }
}
