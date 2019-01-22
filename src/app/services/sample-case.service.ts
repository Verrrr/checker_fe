import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../models/api.class';
import { SampleCase } from '../models/sampleCase.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleCaseService {

  private apiUrl = Api.URL+'samples/';

  constructor(private http: HttpClient) { }

  createSample(sample: SampleCase): Observable<SampleCase>{
    return this.http.post<SampleCase>(this.apiUrl,sample);
  }

  fetchSampleByProblemId(problem_id: number): Observable<SampleCase[]>{
    return this.http.get<SampleCase[]>(`${Api.URL}problems/${problem_id}/samples`);
  }
}
