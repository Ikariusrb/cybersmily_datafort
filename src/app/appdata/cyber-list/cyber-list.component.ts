import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { Observable } from 'rxjs';
import { DataCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { CyberDataService } from './../../shared/cp2020/cp2020-cyberware/services';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cyber-list',
  templateUrl: './cyber-list.component.html',
  styleUrls: ['./cyber-list.component.css'],
})
export class CyberListComponent implements OnInit {
  columns: Array<DataListColumnParameters> = [
    {
      header: 'type',
      property: 'type',
      filters: 'filter',
      inputType: '',
      class: 'col-3 col-md-2',
      sortable: true,
      filterValues: [
        { key: 'BIOWARE', value: 'Bioware' },
        { key: 'BODY PLATING', value: 'Body Plating' },
        { key: 'CHIPWARE', value: 'Chipware' },
        { key: 'CYBERAUDIO', value: 'Cyberaudio' },
        { key: 'CYBERFOOT', value: 'Cyberfoot' },
        { key: 'CYBERHAND', value: 'Cyberhand' },
        { key: 'CYBERLIMB', value: 'Cyberlimb' },
        { key: 'CYBERNETIC SYSTEM', value: 'Cybernetic System' },
        { key: 'CYBEROPTIC', value: 'Cyberoptic' },
        { key: 'CYBERVOCAL', value: 'Cybervocal' },
        { key: 'CYBERWEAPON', value: 'Cyberweapon' },
        { key: 'EXOTIC BODYSCULPT', value: 'Exotic Bodysculpt' },
        { key: 'FASHIONWARE', value: 'Fashionware' },
        { key: 'FULL CONVERSION', value: 'Full Conversion' },
        { key: 'IMPLANT', value: 'Implant' },
        { key: 'LINEAR FRAMES', value: 'Linear Frames' },
        { key: 'NEURALWARE', value: 'Neuralware' },
      ],
      isSourcebook: false,
    },
    {
      header: 'subtype',
      property: 'subtype',
      filters: 'contains',
      inputType: 'text',
      class: 'col-1 d-none d-md-inline-block',
      sortable: true,
      filterValues: null,
      isSourcebook: false,
    },
    {
      header: 'name',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-4 col-md-2',
      sortable: true,
      filterValues: null,
      isSourcebook: false,
    },
    {
      header: 'description',
      property: 'notes',
      filters: 'contains',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block',
      sortable: false,
      filterValues: null,
      isSourcebook: false,
    },
    {
      header: 'cost',
      property: 'cost',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1',
      sortable: true,
      filterValues: null,
      isSourcebook: false,
    },
    {
      header: 'H.C.',
      property: 'hc',
      filters: 'contains',
      inputType: 'text',
      class: 'col-2 col-md-1 text-center',
      sortable: true,
      filterValues: null,
      isSourcebook: false,
    },
    {
      header: 'surg.',
      property: 'surgery',
      filters: 'filter',
      inputType: 'text',
      class: 'text-center col-2 col-md-1',
      sortable: true,
      filterValues: [
        { key: 'N', value: 'N' },
        { key: 'M', value: 'M' },
        { key: 'MA', value: 'MA' },
        { key: 'CR', value: 'CR' },
      ],
      isSourcebook: false,
    },
    {
      header: 'source',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block',
      sortable: false,
      filterValues: null,
      isSourcebook: true,
    },
  ];

  cyberwareList$: Observable<Array<DataCyberware>>;

  constructor(private cyberData: CyberDataService, private seo: SeoService) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Cyberware List',
      "2001-09, Cybersmily's Datafort Cyberpunk 2020 Cyberware List from all sources and search capability."
    );
    this.cyberwareList$ = this.cyberData.CyberwareList;
  }
}
