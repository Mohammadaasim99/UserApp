import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { CountryService } from '../../../../core/services/country.service';
import { User } from '../../../..//core/models/user.model';
import { DateUtil } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  countries: string[] = [];
  user: any;

  constructor(
    private userService: UserService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    public dateService: DateUtil
  ) {

  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.loadCountries();

    if (userId) {
      const user = this.userService.getUserById(userId);
      if (user) {
        this.user = user;
      }
    }
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
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