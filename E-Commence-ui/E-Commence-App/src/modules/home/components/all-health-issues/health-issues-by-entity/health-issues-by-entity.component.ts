import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { HealthIssue } from 'src/modules/shared/interfaces/HealthIssue';
import { HealthIssueEntityGroup } from 'src/modules/shared/interfaces/HealthIssueEntityGroup';

@Component({
  selector: 'app-health-issues-by-entity',
  templateUrl: './health-issues-by-entity.component.html',
  styleUrls: ['./health-issues-by-entity.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HealthIssuesByEntityComponent implements OnInit {
  @Input() NodesHealthIssuesGroups: HealthIssueEntityGroup[] = [];
  @Input() ServicesHealthIssuesGroups: HealthIssueEntityGroup[] = [];

  nodesHealthIssuesTree: TreeNode[] = [];
  servicesHealthIssuesTree: TreeNode[] = [];

  displayIssueDetails: boolean = false;
  selectedHealthIssue: HealthIssue = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadNodesGroups();
    this.loadServicesGroups();
  }

  loadNodesGroups() {
    this.nodesHealthIssuesTree = [];
    if (this.NodesHealthIssuesGroups && this.NodesHealthIssuesGroups.length > 0) {
      this.nodesHealthIssuesTree.push(
        {
          key: '0',
          label: 'Nodes Issues',
          icon: 'pi pi-server',
          children: []
        },
      );

      for (let i = 0; i < this.NodesHealthIssuesGroups.length; i++) {
        this.nodesHealthIssuesTree[0].children?.push(
          {
            key: `${this.NodesHealthIssuesGroups[i]?.clusterName ?? ""}*${this.NodesHealthIssuesGroups[i]?.nodeIp ?? ""}` ?? "",
            label: `${this.NodesHealthIssuesGroups[i]?.clusterName ?? ""} - ${this.NodesHealthIssuesGroups[i]?.nodeIp ?? ""}` ?? "",
            type: 'node',
            children: []
          }
        );
  
        this.NodesHealthIssuesGroups[i]?.healthIssues?.forEach(issue => {
          (this.nodesHealthIssuesTree[0].children ?? [{}])[i].children?.push(
            {
              key: `${this.NodesHealthIssuesGroups[i]?.clusterName ?? ""}*${this.NodesHealthIssuesGroups[i]?.nodeIp ?? ""}` ?? "",
              label: issue.name,
              icon: issue.level === 1? 'pi pi-exclamation-triangle warrning' : 'pi pi-exclamation-circle error',
              type: 'issue'
            }
          );
        });
      }
    }

  }

  loadServicesGroups() {
    this.servicesHealthIssuesTree = [];
    if (this.ServicesHealthIssuesGroups && this.ServicesHealthIssuesGroups.length > 0) {
      this.servicesHealthIssuesTree.push(
        {
          key: '1',
          label: 'Services Issues',
          icon: 'pi pi-th-large',
          children: []
        },
      );

      for (let i = 0; i < this.ServicesHealthIssuesGroups.length; i++) {
        this.servicesHealthIssuesTree[0].children?.push(
          {
            key: `${this.ServicesHealthIssuesGroups[i]?.clusterName ?? ""}*${this.ServicesHealthIssuesGroups[i]?.nodeIp ?? ""}*${this.ServicesHealthIssuesGroups[i]?.serviceName ?? ""}` ?? "",
            label: `${this.ServicesHealthIssuesGroups[i]?.clusterName ?? ""} - ${this.ServicesHealthIssuesGroups[i]?.nodeIp ?? ""} - ${this.ServicesHealthIssuesGroups[i]?.serviceName ?? ""}` ?? "",
            type: 'service',
            children: []
          }
        );
  
        this.ServicesHealthIssuesGroups[i]?.healthIssues?.forEach(issue => {
          (this.servicesHealthIssuesTree[0].children ?? [{}])[i].children?.push(
            {
              key: `${this.ServicesHealthIssuesGroups[i]?.clusterName ?? ""}*${this.ServicesHealthIssuesGroups[i]?.nodeIp ?? ""}*${this.ServicesHealthIssuesGroups[i]?.serviceName ?? ""}` ?? "",
              label: issue.name,
              icon: issue.level === 1? 'pi pi-exclamation-triangle warrning' : 'pi pi-exclamation-circle error',
              type: 'issue'
            }
          );
        });
      }
    }

  }

  healthIssueSelected(event: any) {
    let clickedEntity = event?.['node'];
    if (clickedEntity) {
      const sectors = clickedEntity?.['key'].split("*");

      switch (clickedEntity?.['type']) {
        case "node":
          this.router.navigateByUrl(`/nodes/${sectors[0]}/${sectors[1]}`);
          break;
        case "service":
          this.router.navigateByUrl(`/services/${sectors[0]}/${sectors[1]}/${sectors[2]}`);
          break;
        case "issue":
          if (sectors.length && sectors.length > 0) {
            switch (sectors.length) {
              case 2:
                let nodeIndex = -1;
                nodeIndex = this.NodesHealthIssuesGroups.indexOf(
                  this.NodesHealthIssuesGroups.filter(n => n.clusterName === sectors[0] && n.nodeIp === sectors[1])[0]
                );
                if (nodeIndex !== undefined && nodeIndex !== -1) {
                  let issueIndex = -1;
                  issueIndex = this.NodesHealthIssuesGroups[nodeIndex].healthIssues?.indexOf(
                    (this.NodesHealthIssuesGroups?.[nodeIndex]?.healthIssues ?? [])?.filter(i => i.name === clickedEntity?.['label'])[0]
                  ) ?? -1;
                  if (issueIndex !== undefined && issueIndex !== -1) {
                    this.selectedHealthIssue = this.NodesHealthIssuesGroups?.[nodeIndex]?.healthIssues?.[issueIndex] ?? {};
                    this.displayIssueDetails = true;
                  }
                }
                break;
              case 3:
                let serviceIndex = -1;
                serviceIndex = this.ServicesHealthIssuesGroups.indexOf(
                  this.ServicesHealthIssuesGroups.filter(n => n.clusterName === sectors[0] && n.nodeIp === sectors[1] && n.serviceName === sectors[2])[0]
                );
                if (serviceIndex !== undefined && serviceIndex !== -1) {
                  let issueIndex = -1;
                  issueIndex = this.ServicesHealthIssuesGroups[serviceIndex].healthIssues?.indexOf(
                    (this.ServicesHealthIssuesGroups?.[serviceIndex]?.healthIssues ?? [])?.filter(i => i.name === clickedEntity?.['label'])[0]
                  ) ?? -1;
                  if (issueIndex !== undefined && issueIndex !== -1) {
                    this.selectedHealthIssue = this.ServicesHealthIssuesGroups?.[serviceIndex]?.healthIssues?.[issueIndex] ?? {};
                    this.displayIssueDetails = true;
                  }
                }
                break;
            }
          }
          break;
      }
    }
  }

}
