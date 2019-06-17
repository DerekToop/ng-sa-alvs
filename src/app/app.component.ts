import { Component } from '@angular/core';
import { AppService } from './app.service';
import { AlvsCandidate } from './models/alvs-candidate.entity';
import { AlvsCandidateResult } from './models/alvs-candidate-result.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public events: string[] = [];
  public source: Array<string> = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan'];
  public data: Array<string>;

  constructor(
    private service: AppService,
  ) {
  }

  public valueChange(value: any): void {
    this.log('valueChange', value);
  }

  public filterChange(filter: any): void {
    this.log('filterChange', filter);
    // this.data = this.source.filter((s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    this.service.getCandidates(filter)
      .subscribe((resp: AlvsCandidateResult) => {
        const candidates = resp.candidates;
        this.data = candidates.map(c => c.address);
      });
  }

  public open(): void {
    this.log('open');
  }

  public close(): void {
    this.log('close');
  }

  public focus(): void {
    this.log('focus');
  }

  public blur(): void {
    this.log('blur');
  }

  private log(event: string, arg: any = null): void {
    console.log(`${event} ${arg || ''}`);
  }
}
