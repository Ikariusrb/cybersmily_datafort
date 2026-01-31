import { JsonDataFiles } from './../../../../services/file-services/json-data-files';
import {
  GangChartData,
  gangNamingTable,
  gangThreatCodeTable,
} from './../../models';
import { computed, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { GangChartEntry } from '../../models';
import { ValueWeight } from './../../../../models';

@Injectable({
  providedIn: 'root',
})
export class GangDataService {
  private _gangChartDataResource = httpResource<GangChartData>(
    () => JsonDataFiles.GANG_CHART_DATA_JSON,
  );
  isLoading = this._gangChartDataResource.isLoading;

  gangDataCharts = computed<GangChartData>(
    () => this._gangChartDataResource.value() ?? undefined,
  );
  gangTypesChart = computed<Array<GangChartEntry>>(
    () => this.fillChart(this._gangChartDataResource.value()?.type) ?? [],
  );
  gangAgeChart = computed<Array<GangChartEntry>>(
    () => this.fillChart(this._gangChartDataResource.value()?.age) ?? [],
  );
  gangMemberAgeChart = computed<Array<GangChartEntry>>(
    () => this.fillChart(this._gangChartDataResource.value()?.memberAge) ?? [],
  );
  gangMemberChart = computed<Array<GangChartEntry>>(
    () => this.fillChart(this._gangChartDataResource.value()?.member) ?? [],
  );
  gangTurfChart = computed<Array<GangChartEntry>>(
    () => this.fillChart(this._gangChartDataResource.value()?.turf) ?? [],
  );
  gangExpansionChart = computed<Array<GangChartEntry>>(
    () => this.fillChart(this._gangChartDataResource.value()?.expansion) ?? [],
  );
  gangBaseChrimesChart = computed(
    () => this._gangChartDataResource.value()?.baseCrimes,
  );
  gangCrimeChart = computed<Array<GangChartEntry>>(
    () => this.fillChart(this._gangChartDataResource.value()?.crimes) ?? [],
  );
  gangThreadCodesChart = computed<gangThreatCodeTable>(
    () => this._gangChartDataResource.value()?.threatcode,
  );
  gangNamingChart = computed<gangNamingTable>(
    () => this._gangChartDataResource.value()?.naming,
  );

  private fillChart(list: Array<ValueWeight<string>>): Array<GangChartEntry> {
    let result = new Array<GangChartEntry>();
    console.log('list fillChart', list);
    list?.forEach((item) => {
      result = [...result, ...Array(item.wt).fill(item)];
    });
    return result;
  }
}
