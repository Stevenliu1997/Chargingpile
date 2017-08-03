import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AddRuleComponent} from './add-rule.component';

@Component({
    selector: 'app-charging-rule-add',
    templateUrl: './charging-rule-add.component.html'
})
export class ChargingRuleAddComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    config: object = {
        url: 'SiteInformation/site-management',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '增加规则',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(AddRuleComponent);
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.result.then(result => {
                        this.update(result);
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (ids) {
                    console.log(ids);
                }.bind(this),
                autoConfig: {
                    url: 'CarBrand/Delete'
                }
            }
        ]
    };

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
