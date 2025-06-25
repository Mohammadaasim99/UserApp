import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { CountryService } from '../../../../core/services/country.service';
import { User } from '../../../../core/models/user.model';
import { DateUtil } from '../../../../core/utils/date.utils';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  countries: string[] = [];
  countryLoadError: string | null = null;
  user: User | null = null;

  constructor(
    private userService: UserService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    public dateService: DateUtil
  ) {

  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id') || null;
    this.loadCountries();

    if (userId) {
      this.user = this.userService.getUserById(userId) || null;
      if (!this.user) {
        // Optionally handle user not found
        this.router.navigate(['/users']);
      }
    }
  }

  loadCountries(): void {
    this.countryService.getCountries()
      .pipe(take(1))
      .subscribe({
        next: (countries) => {
          this.countries = countries;
          this.countryLoadError = null;
        },
        error: () => {
          this.countries = [];
          this.countryLoadError = 'Failed to load countries. Please try again later.';
        }
      });
  }

  onSubmit(userForm: User): void {
    if (userForm) {
      this.userService.updateUser(userForm);
      this.router.navigate(['/users']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}