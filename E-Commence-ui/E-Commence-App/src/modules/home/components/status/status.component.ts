import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faWarning, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { HostStatus } from 'src/modules/shared/enums/HostStatus.enum';
import { Cluster } from 'src/modules/shared/interfaces/Cluster';
import { Node } from 'src/modules/shared/interfaces/Node';
import { ClusterToView } from '../../interfaces/ClusterToView';
import { environment } from 'src/environments/environment';
import { groupBy } from 'underscore';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatusComponent implements OnInit {
  faWarning = faWarning;
  faDotCircle = faDotCircle;
  HostStatus: HostStatus = HostStatus.Good;

  clustersToView: ClusterToView[] = [];
  clusters: Cluster[] = [];
  grafana: any = {};

  constructor(private activatedRoute: ActivatedRoute) {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      data => {
        if (data && data["AllClusters"]) {
          if (!data["AllClusters"].hasErrors) {
            this.clusters = data["AllClusters"].data;            
          }
        }
      },
      error => console.error("Error: ", error)
    );
    this.MapNodesClustersToView();    

    this.grafana = environment.grafana;
  }


  MapNodesClustersToView() {
    if (this.clusters) {
      for (let i = 0; i < this.clusters.length; i++) {
        let groupsRes = groupBy(this.clusters[i].nodes??[], n => n.services[0]?.type??"");        
        let groups: {title: string, nodes: Node[]}[] = [];          
        for (const key of Object.keys(groupsRes)) {
          groups.push({title:key, nodes: groupsRes[key]})
        } 
        
        this.clustersToView.push(
          {
            id: this.clusters[i]?.id,
            name: this.clusters[i]?.name ?? "",
            isRegistered: this.clusters[i]?.isRegistered,
            nodes: JSON.parse(JSON.stringify(this.clusters[i]?.nodes)),
            groups: groups
          }
        );
      }

      this.clusters = this.clusters.sort(this.alphabetically(true));
    }
  }
  groupBy(collection: any[], property: string) {
    var i = 0, val, index,
      values = [], result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1)
        result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }
  alphabetically(ascending:boolean) {
    return function (a:Cluster, b:Cluster) {
      // equal items sort equally
      if (a.name === b.name) {
          return 0;
      }
  
      // nulls sort after anything else
      if (a.name === "Unregistered") {
          return 1;
      }
      if (b.name === "Unregistered") {
          return -1;
      }
  
      // otherwise, if we're ascending, lowest sorts first
      if (ascending) {
          return a < b ? -1 : 1;
      }
  
      // if descending, highest sorts first
      return a < b ? 1 : -1;
    };
  }
}
