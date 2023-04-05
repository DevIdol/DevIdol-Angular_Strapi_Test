import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-exployee-list',
  templateUrl: './exployee-list.component.html',
  styleUrls: ['./exployee-list.component.scss'],
})

export class ExployeeListComponent implements OnInit {
  profile = '../../../../assets/images/img_profile.png'
  tableHeader: string[] = [
    'id',
    'username',
    'email',
    'photo',
    'address',
    'phone',
    'dob',
    'actions',
  ];

  searchValue = '';
  EMPLOYEE_DATA!: Employee[];
  employeeData = new MatTableDataSource(this.EMPLOYEE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employeeData) => {
      const activeEmployee = employeeData.filter((employee: any) => employee.deletedAt === null);
      this.employeeData = new MatTableDataSource<Employee>(activeEmployee);
      this.employeeData.paginator = this.paginator;
      this.employeeData.sort = this.sort;
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employeeService.getEmployees().subscribe((employeeData) => {
        const activeEmployee = employeeData.filter((employee: any) => employee.deletedAt === null);
        this.employeeData = new MatTableDataSource<Employee>(activeEmployee);
        this.employeeData.paginator = this.paginator;
        this.employeeData.sort = this.sort;
      });
    }, error => {
      console.log(error.error.error.message);
    });
  }

  clearSearch() {
    this.searchValue = '';
  }

}
