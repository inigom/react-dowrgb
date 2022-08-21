import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, Sort, Edit, Toolbar, Aggregate, Page } from '@syncfusion/ej2-react-grids';
import { AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { Browser } from "@syncfusion/ej2-base";
import { data } from './data';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';

export class Adaptive extends SampleBase {
    grid;
    checkboxObj;
    toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    renderingMode = 'Vertical';
    editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    validationRule = { required: true };
    orderidRules = { required: true, number: true };
    filterOptions = { type: 'Excel' };
    onChange(e) {
        if (e.checked) {
            this.grid.rowRenderingMode = 'Horizontal';
        }
        else {
            this.grid.rowRenderingMode = 'Vertical';
        }
    }
    ;
    footerSum(props) {
        return (<span>Sum: {props.Sum}</span>);
    }
    footerAvg(props) {
        return (<span>Average: {props.Average}</span>);
    }
    load() {
        this.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0];
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <style>
            {SAMPLE_CSS}
          </style>
          <div className="col-md-9 e-bigger e-adaptive-demo">
            {!Browser.isDevice ? (<div className="e-mobile-layout">
                <div className="e-mobile-content">
                    <GridComponent id="adaptivebrowser" dataSource={data} height='100%' ref={grid => this.grid = grid} enableAdaptiveUI={true} rowRenderingMode={this.renderingMode} allowFiltering={true} allowSorting={true} allowPaging={true} filterSettings={this.filterOptions} toolbar={this.toolbarOptions} editSettings={this.editSettings} pageSettings={{ pageCount: 3 }} load={this.load}>
                      <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='180' isPrimaryKey={true} validationRules={this.orderidRules}></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='180' format='C2' editType='numericedit' validationRules={this.validationRule}/>
                        <ColumnDirective field='CustomerName' headerText='Name' width='180' validationRules={this.validationRule}></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='180'></ColumnDirective>
                      </ColumnsDirective>
                      <AggregatesDirective>
                        <AggregateDirective>
                          <AggregateColumnsDirective>
                            <AggregateColumnDirective field='Freight' type='Sum' format='C2' footerTemplate={this.footerSum}> </AggregateColumnDirective>
                          </AggregateColumnsDirective>
                        </AggregateDirective>
                      </AggregatesDirective>
                      <Inject services={[Filter, Sort, Edit, Toolbar, Aggregate, Page]}/>
                    </GridComponent>
                </div>
              </div>) : (<GridComponent id="adaptivedevice" dataSource={data} height='100%' ref={grid => this.grid = grid} enableAdaptiveUI={true} rowRenderingMode={this.renderingMode} allowFiltering={true} allowSorting={true} allowPaging={true} filterSettings={this.filterOptions} toolbar={this.toolbarOptions} editSettings={this.editSettings} pageSettings={{ pageCount: 3 }} load={this.load}>
                    <ColumnsDirective>
                      <ColumnDirective field='OrderID' headerText='Order ID' width='180' isPrimaryKey={true} validationRules={this.orderidRules}></ColumnDirective>
                      <ColumnDirective field='Freight' headerText='Freight' width='180' format='C2' editType='numericedit' validationRules={this.validationRule}/>
                      <ColumnDirective field='CustomerName' headerText='Name' width='180' validationRules={this.validationRule}></ColumnDirective>
                      <ColumnDirective field='ShipCountry' headerText='Ship Country' width='180'></ColumnDirective>
                    </ColumnsDirective>
                    <AggregatesDirective>
                      <AggregateDirective>
                        <AggregateColumnsDirective>
                          <AggregateColumnDirective field='Freight' type='Sum' format='C2' footerTemplate={this.footerSum}> </AggregateColumnDirective>
                        </AggregateColumnsDirective>
                      </AggregateDirective>
                    </AggregatesDirective>
                    <Inject services={[Filter, Sort, Edit, Toolbar, Aggregate, Page]}/>
                  </GridComponent>)}
          </div>
          <div className='col-md-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                <tr>
                  <td>
                    <div>Enable horizontal row mode</div>
                  </td>
                  <td>
                    <div>
                      <CheckBoxComponent ref={(scope) => { this.checkboxObj = scope; }} change={this.onChange.bind(this)}></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
      </div>);
    }
}

const root = createRoot(document.getElementById('sample'));
root.render(<Adaptive />);