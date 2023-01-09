import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-infos-card',
  templateUrl: './infos-card.component.html',
  styleUrls: ['./infos-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosCardComponent implements OnInit {
  @Input() location?: Location;

  constructor() {}

  ngOnInit(): void {}
}
