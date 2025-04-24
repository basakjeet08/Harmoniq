import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { TagService } from '../../../shared/services/tag.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { TagDto } from '../../../shared/Models/tag/TagDto';

@Component({
  selector: 'app-tag-search-select',
  templateUrl: './tag-search-select.component.html',
  styleUrls: ['./tag-search-select.component.css'],
})
export class TagSearchSelectComponent implements OnInit {
  // This is the event which will be emitted when the button is clicked
  @Output('onButtonClick') buttonEvent: EventEmitter<string> = new EventEmitter<string>();

  // Data for this component
  tagList: TagDto[] = [];
  filteredTagList: TagDto[] = [];
  previousUserInput: string = '';
  userInput: string = '';

  // Visibility and UX Variables
  showDropDown: boolean = false;

  // Global Loading State to prevent multiple API Calls
  loaderState: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private tagService: TagService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private _eref: ElementRef,
  ) {
    this.loaderService.loaderState$.subscribe((state) => (this.loaderState = state));
  }

  // Loading the tags initially
  ngOnInit(): void {
    this.loadMoreTags();
  }

  // This function fetches more tags when scrolled
  loadMoreTags(): void {
    // If already loading we skip
    if (this.loaderState) return;

    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API Request
    this.tagService.fetchAllTags().subscribe({
      // Success State
      next: (tagDtoList) => {
        this.loaderService.endLoading();
        this.tagList = tagDtoList;
        this.filteredTagList = tagDtoList;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function filters the tags
  onTagFilter(): void {
    // If the user clicks something like shift or ctrl then we ignore until the text changes
    if (this.userInput === this.previousUserInput) return;

    // Filtering the inputs
    if (this.userInput === '') {
      this.filteredTagList = this.tagList;
    } else {
      this.filteredTagList = this.tagList.filter((tag) => tag.name.includes(this.userInput));
    }

    // Updating the previous input
    this.previousUserInput = this.userInput;
  }

  // This function updates the user input from the dropdown
  onDropdownChosen(newTag: string): void {
    // Updating the data
    this.userInput = newTag;

    // Filtering the Tags
    this.onTagFilter();

    // Sending the event to the parent component
    this.buttonEvent.emit(this.userInput);

    // Closing the dropdown
    this.showDropDown = false;
  }

  // This function is invoked when the user clicks on the search input field
  onSearchFieldClick(): void {
    this.showDropDown = true;
  }

  // This function disables the dropdown accordingly
  @HostListener('document:click', ['$event'])
  @HostListener('document:scroll', ['$event'])
  onDropDownClose(event: MouseEvent): void {
    if (!this._eref.nativeElement.contains(event.target as Node)) {
      this.showDropDown = false;
    }
  }
}
