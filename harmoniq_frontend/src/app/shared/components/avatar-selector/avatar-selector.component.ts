import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast/toast.service';
import { staggerPopAnimation } from './stagger-pop-animation';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.css'],
  animations: [staggerPopAnimation],
})
export class AvatarSelectorComponent implements OnInit {
  // Parent passed values
  @Input('buttonDisabled') isButtonDisabled: boolean = false;
  @Input('currentAvatar') currentChosenAvatar: string = '';
  @Output('onAvatarChosen') avatarEmitter: EventEmitter<string> = new EventEmitter<string>();

  // This is the data for the component
  avatarList: string[] = [];
  chooseMode: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private toastService: ToastService,
  ) {}

  // This function fetches all the avatars
  ngOnInit(): void {
    this.fetchAvatars();
  }

  // This function is invoked when the user clicks the register button
  fetchAvatars(): void {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api to register the user
    this.userService.fetchAllAvatars().subscribe({
      // Success State
      next: (avatarList: string[]) => {
        this.loaderService.endLoading();
        this.avatarList = avatarList;

        if (this.currentChosenAvatar === '') {
          this.onAvatarChosen(avatarList[0]);
        }
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks to choose the avatar
  onEnableChooseMode(): void {
    if (!this.isButtonDisabled) {
      this.chooseMode = true;
    }
  }

  // This function is invoked when the user clicks on the cancel button
  onDisableChosenMode(): void {
    this.chooseMode = false;
  }

  // this function is invoked when the user has chosen a component
  onAvatarChosen(avatarLink: string): void {
    this.currentChosenAvatar = avatarLink;
    this.avatarEmitter.emit(avatarLink);
    this.onDisableChosenMode();
  }
}
