import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProblemService } from 'src/app/services/problem.service';
import { Problem } from 'src/app/models/problem.interface';
import { SampleCase } from 'src/app/models/sampleCase.interface';
import { SampleCaseService } from 'src/app/services/sample-case.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  @ViewChild('addProblemInput') addProblemInput: ElementRef;
  addButtonLoading: boolean;
  showEditTitle: boolean;
  showEditExplain: boolean;

  problems: Problem[];
  sampleCases: SampleCase[];
  selectedProblem: Problem;

  constructor(
    private problemService: ProblemService,
    private sampleService: SampleCaseService
  ) {
    this.sampleCases = new Array<SampleCase>();
   }

  async ngOnInit() {
    await this.loadProblems();
  }

  async loadProblems(){
    this.problems = await this.problemService.fetchProblems().toPromise();
  }

  async loadCases(){
    this.sampleCases = await this.sampleService.fetchSampleByProblemId(this.selectedProblem.problem_id).toPromise();
  }

  async addProblem(){
    const title = this.addProblemInput.nativeElement.value;
    if(!!title.trim()){
      this.addButtonLoading = true;
      const problem: Problem = await this.problemService.addProblem({title}).toPromise();
      this.addButtonLoading = false;
      this.addProblemInput.nativeElement.value = "";
      this.problems.push(problem);
      this.selectedProblem = problem;
    }
  }

  async deleteProblem(problem: Problem){
    await this.problemService.deleteProblem(problem).toPromise();
    this.loadProblems();
  }

  async updateProblem(problem: Problem){
    console.log(this.selectedProblem);
    await this.problemService.updateProblem(problem, this.selectedProblem.problem_id).toPromise();
    Object.assign(this.selectedProblem, problem);
  }


  async createSample(sample: SampleCase){
    let newSample = await this.sampleService.createSample(sample).toPromise();
    this.sampleCases.push(newSample);
  }

  async select(problem: Problem){
    this.selectedProblem = problem;
    this.showEditExplain = false;
    this.showEditTitle = false;
    await this.loadCases();
  }
}
