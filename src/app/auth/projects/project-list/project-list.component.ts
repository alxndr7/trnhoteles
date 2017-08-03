import { Component, OnInit } from '@angular/core';
import { ProjectListService } from './services/project-list.service';
import { Project } from './models/project.model';
import { HttpService } from '../../../common/services/http.service';
import {Config} from '../../../common/config';
import {AuthenticationService} from 'app/common/services/authentication.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Array<Project> = [];
  apiBaseURL: string = Config.API_SERVER_URL;
  isLoading = true;

  constructor(private _projectListService: ProjectListService,
  private _httpService: HttpService,  private _authService: AuthenticationService) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this._projectListService.getAll().subscribe((projects: Project[] = []) => {
        this.projects = projects;
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
      },
      () => {
        console.log('Finished!');
      });
  }
  public setData(sortedData) {
    console.log('sortedData: %o', sortedData);
    this.projects = sortedData;
  }

  onDeleteProject(project: Project) {
    const url = `${this.apiBaseURL}/projects/${project.id}`;

    this._httpService.delete(url, this._authService.user.token).subscribe((response) => {
        console.log(response);
        this.getAllProjects();
      },
      err => {
        console.error(err);
      });
  }

}
