import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.interface';
import { HttpClient } from '@angular/common/http';
import { Api } from '../models/api.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  private apiUrl = Api.URL+'problems';

  constructor(private http: HttpClient) { }

  addProblem(problem: Problem): Observable<Problem>{
    return this.http.post<Problem>(this.apiUrl, problem);
  }

  fetchProblems(): Observable<Problem[]>{
    return this.http.get<Problem[]>(this.apiUrl);
  }

  deleteProblem(problem: Problem){
    return this.http.delete(this.apiUrl+'/'+problem.problem_id);
  }

  updateProblem(problem: Problem,problem_id){
    return this.http.request('patch',this.apiUrl+'/'+problem_id,{body: problem});
  }
}
