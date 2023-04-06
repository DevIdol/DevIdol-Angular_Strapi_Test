import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/interfaces';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-exployee-detail',
  templateUrl: './exployee-detail.component.html',
  styleUrls: ['./exployee-detail.component.scss'],
})

export class ExployeeDetailComponent implements OnInit, AfterViewInit {
  profileSize = ['large', 'medium', 'small', 'thumbnail'];
  employeeDetail!: Employee;
  employeeId!: number;
  profilePhoto!: File;
  profileImg = '';
  imageUrl!: '';
  imageName = '';
  profileId!: number;
  isLoading = false;
  pageLoading = false;
  fileSelected = false;
  isRemoving = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageLoading = true;
    const { id } = this.route.snapshot.params;
    this.employeeId = +id;
    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId).subscribe(
        (employeeData) => {
          if (employeeData.profile) {
            const img = this.profileSize
              .map((key) => employeeData.profile?.formats?.[key]?.url)
              .find((url: string) => !!url);
            this.profileImg = img;
            this.imageUrl = img;
            this.profileId = employeeData.profile.id;
          }
          this.employeeDetail = employeeData;
        },
        (error) => {
          console.log('Error', error);
        }
      );
    }
  }

  ngAfterViewInit() {
    this.pageLoading = false;
  }

  //Select Profile Image From Device
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.fileSelected = true;
      const file = event.target.files[0];
      this.profilePhoto = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  cancelFileSelection(): void {
    this.profileImg = this.imageUrl ?? '';
    this.fileSelected = false;
  }

  //Upload Profile
  uploadProfile() {
    this.isLoading = true;
    const formData: FormData = new FormData();
    const upoloadProfile = new FormData();
    if (this.profilePhoto) {
      upoloadProfile.append('files', this.profilePhoto);
      this.employeeService
        .updateEmployee(this.employeeId, formData, upoloadProfile)
        .subscribe(
          () => {
            this.fileSelected = false;
            this.isLoading = false;
            this.router.navigate([`/employees/${this.employeeId}`]);
          },
          (error) => {
            const { message } = error.error.error;
            console.log(message);
            this.isLoading = false;
          }
        );
    } else {
      this.router.navigate([`/employees/${this.employeeId}`]);
    }
  }

  //Delete Profile
  deleteProfile() {
    this.isRemoving = true;
    this.employeeService.deleteProfile(this.profileId).subscribe(
      () => {
        this.isRemoving = false;
        this.router.navigate([`/employees/${this.employeeId}`]);
        this.profileImg = '';
      },
      (error) => {
        console.log(error);
        this.router.navigate([`/employees/${this.employeeId}`]);
      }
    );
  }
}
