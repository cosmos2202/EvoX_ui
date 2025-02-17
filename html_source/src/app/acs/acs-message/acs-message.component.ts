import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Transaction} from '../../_helpers/models/transaction.model';
import {VariablesService} from '../../_helpers/services/variables.service';
import {BackendService} from '../../_helpers/services/backend.service';
import {IntToMoneyPipe} from '../../_helpers/pipes/int-to-money.pipe';
import {BLOCK_EXPLORER_TX_URL_PREFIX} from '../../_shared/constants';
import {BLOCK_EXPLORER_TN_TX_URL_PREFIX} from '../../_shared/constants';

@Component({
  selector: 'app-acs-message',
  templateUrl: './acs-message.component.html',
  styleUrls: ['./acs-message.component.scss']
})
export class AcsMessageComponent implements OnInit, OnDestroy {

  @Input() transaction: Transaction;
  @Input() sizes: Array<number>;
  inputs: Array<string> = [];
  outputs: Array<string> = [];

  constructor(public variablesService: VariablesService, private backendService: BackendService, private intToMoneyPipe: IntToMoneyPipe) { }

  ngOnInit() {
    for (const input in this.transaction.td['spn']) {
      if (this.transaction.td['spn'].hasOwnProperty(input)) {
        this.inputs.push(this.intToMoneyPipe.transform(this.transaction.td['spn'][input]));
      }
    }
    for (const output in this.transaction.td['rcv']) {
      if (this.transaction.td['rcv'].hasOwnProperty(output)) {
        this.outputs.push(this.intToMoneyPipe.transform(this.transaction.td['rcv'][output]));
      }
    }
  }

  openInBrowser(tr) {
    this.backendService.openUrlInBrowser((this.variablesService.testnet ? BLOCK_EXPLORER_TN_TX_URL_PREFIX : BLOCK_EXPLORER_TX_URL_PREFIX)+ tr);
  }

  ngOnDestroy() {}

}
