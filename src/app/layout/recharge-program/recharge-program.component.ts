import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {RechargeProgramAddComponent} from './recharge-program-add.component';
import {RechargeProgramEditComponent} from './recharge-program-edit.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-form',
    templateUrl: './recharge-program.component.html',
    styleUrls: ['./recharge-program.component.scss'],
    animations: [routerTransition()]
})
export class RechargeProgramComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'recharge-program/Find',    //和后端交互URL
        column: [
            {name: '程序版本号', key: 'version'},
            {name: '程序名称', key: 'name'},
            {name: '程序所在路径', key: 'path'}
        ],
        // 与后端交互，queryModel.name
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(RechargeProgramAddComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.updateProgram(result);
                    })
                }.bind(this)
            }
        ],
        rowActions: [
            {
                type: `upload`,
                action: function(item) {
                    console.log(item);
                }
            },
            {
                type: 'delete',
                action: function (item) {
                    console.log(item);
                }
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(RechargeProgramEditComponent);
                    modalRef.componentInstance.actionTitle = '更新';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateProgram(result);
                    })
                }.bind(this)
            }
        ]
    };

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }


    ngOnInit() {
    }
    //查
    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
    //改
    updateProgram(program: object){
        this.customHttpClient.post('recharge-program/Update', program).subscribe(result => {

        })
    }
}