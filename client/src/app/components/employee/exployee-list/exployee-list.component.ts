import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
export class ExployeeListComponent implements OnInit, AfterViewInit {
  profile = '../../../../assets/images/img_profile.png';
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
  pageLoading = false;
  isFooterFixed = false;
  employeeData = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.pageLoading = true;
    this.employeeService.getEmployees().subscribe((employeeData) => {
      const activeEmployee = employeeData.filter(
        (employee: any) => employee.deletedAt === null
      );
      this.employeeData = new MatTableDataSource<Employee>(activeEmployee);
      if (activeEmployee.length < 5) {
        this.isFooterFixed = true;
      }
      this.employeeData.paginator = this.paginator;
      this.employeeData.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.pageLoading = false;
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.employeeService.getEmployees().subscribe((employeeData) => {
          const activeEmployee = employeeData.filter(
            (employee: any) => employee.deletedAt === null
          );
          this.employeeData = new MatTableDataSource<Employee>(activeEmployee);
          if (activeEmployee.length < 5) {
            this.isFooterFixed = true;
          }
          this.employeeData.paginator = this.paginator;
          this.employeeData.sort = this.sort;
        });
      },
      (error) => {
        console.log(error.error.error.message);
      }
    );
  }

  clearSearch() {
    this.searchValue = '';
  }
}
