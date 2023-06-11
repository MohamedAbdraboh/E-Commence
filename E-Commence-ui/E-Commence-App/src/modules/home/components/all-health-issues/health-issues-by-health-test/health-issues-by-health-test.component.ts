import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { HealthIssue } from 'src/modules/shared/interfaces/HealthIssue';
import { HealthIssueEntityGroup } from 'src/modules/shared/interfaces/HealthIssueEntityGroup';
import { HealthIssueTypeGroup } from 'src/modules/shared/interfaces/HealthIssueTypeGroup';
import { StaticListsHelperService } from 'src/modules/shared/services/static-lists-helper.service';
import { groupBy } from 'underscore';

@Component({
  selector: 'app-health-issues-by-health-test',
  templateUrl: './health-issues-by-health-test.component.html',
  styleUrls: ['./health-issues-by-health-test.component.css']
})
export class HealthIssuesByHealthTestComponent implements OnInit {

  @Input() WarnningHealthIssuesGroups: HealthIssueTypeGroup[] = [];
  @Input() ErrorHealthIssuesGroups: HealthIssueTypeGroup[] = [];

  warnningHealthIssuesTree: TreeNode[] = [];
  errorHealthIssuesTree: TreeNode[] = [];

  displayIssueDetails: boolean = false;
  selectedHealthIssue: HealthIssueTypeGroup = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadWarnningGroups();
    this.loadErrorGroups();
  }

  loadWarnningGroups() {
    this.warnningHealthIssuesTree = [];
    if (this.WarnningHealthIssuesGroups && this.WarnningHealthIssuesGroups.length > 0) {
      this.warnningHealthIssuesTree.push(
        {
          key: '0',
          label: 'Warnning Issues',
          icon: 'pi pi-exclamation-triangle warrning',
          children: []
        },
      );

      let groupsRes = groupBy(this.WarnningHealthIssuesGroups ?? [], w => w.type ?? 0);
      let healthIssuesGroupsRes: { title: string, issues: HealthIssueTypeGroup[] }[] = [];
      for (const key of Object.keys(groupsRes)) {
        healthIssuesGroupsRes.push({ title: key, issues: groupsRes[key] })
      }

      for (let i = 0; i < healthIssuesGroupsRes.length; i++) {
        this.warnningHealthIssuesTree[0].children?.push(
          {
            key: healthIssuesGroupsRes[i].title ?? "",
            label: StaticListsHelperService.getItemKey(StaticListsHelperService.HealthIssueType, +healthIssuesGroupsRes[i].title ?? ""),
            type: 'warnning',
            children: []
          }
        );
        healthIssuesGroupsRes[i]?.issues?.forEach(issue => {
          (this.warnningHealthIssuesTree[0].children ?? [{}])[i].children?.push(
            {
              key: issue.level === 2 ? `${issue?.clusterName ?? ""}*${issue?.nodeIp ?? ""}` ?? ""
                : `${issue?.clusterName ?? ""}*${issue?.nodeIp ?? ""}*${issue?.serviceName ?? ""}` ?? "",
              label: issue.level === 2 ? `${issue?.clusterName ?? ""} - ${issue?.nodeIp ?? ""}` ?? ""
                : `${issue?.clusterName ?? ""} - ${issue?.nodeIp ?? ""} - ${issue?.nodeIp ?? ""}` ?? "",
              icon: issue.level === 2 ? 'pi pi-server' : 'pi pi-th-large',
              type: issue.level === 2 ? 'node' : 'service'
            }
          );
        });
      }
    }
  }

  loadErrorGroups() {
    this.errorHealthIssuesTree = [];
    if (this.ErrorHealthIssuesGroups && this.ErrorHealthIssuesGroups.length > 0) {
      this.errorHealthIssuesTree.push(
        {
          key: '0',
          label: 'Error Issues',
          icon: 'pi pi-exclamation-circle error',
          children: []
        },
      );

      let groupsRes = groupBy(this.ErrorHealthIssuesGroups ?? [], e => e.type ?? 0);
      let healthIssuesGroupsRes: { title: string, issues: HealthIssueTypeGroup[] }[] = [];
      for (const key of Object.keys(groupsRes)) {
        healthIssuesGroupsRes.push({ title: key, issues: groupsRes[key] })
      }

      for (let i = 0; i < healthIssuesGroupsRes.length; i++) {
        this.errorHealthIssuesTree[0].children?.push(
          {
            key: healthIssuesGroupsRes[i].title ?? "",
            label: StaticListsHelperService.getItemKey(StaticListsHelperService.HealthIssueType, +healthIssuesGroupsRes[i].title ?? ""),
            type: 'error',
            children: []
          }
        );

        healthIssuesGroupsRes[i]?.issues?.forEach(issue => {
          (this.errorHealthIssuesTree[0].children ?? [{}])[i].children?.push(
            {
              key: issue.level === 2 ? `${issue?.clusterName ?? ""}*${issue?.nodeIp ?? ""}` ?? ""
                : `${issue?.clusterName ?? ""}*${issue?.nodeIp ?? ""}*${issue?.serviceName ?? ""}` ?? "",
              label: issue.level === 2 ? `${issue?.clusterName ?? ""} - ${issue?.nodeIp ?? ""}` ?? ""
                : `${issue?.clusterName ?? ""} - ${issue?.nodeIp ?? ""} - ${issue?.nodeIp ?? ""}` ?? "",
              icon: issue.level === 2 ? 'pi pi-server' : 'pi pi-th-large',
              type: issue.level === 2 ? 'node' : 'service'
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
        case "warnning":
          let warnningIssueIndex = -1;
          warnningIssueIndex = this.WarnningHealthIssuesGroups.indexOf(
            this.WarnningHealthIssuesGroups.filter(n => n.clusterName === sectors[0] && n.nodeIp === sectors[1])[0]
          );
          if (warnningIssueIndex !== undefined && warnningIssueIndex !== -1) {
            this.selectedHealthIssue = this.WarnningHealthIssuesGroups?.[warnningIssueIndex] ?? {};
            this.displayIssueDetails = true;
          }
          break;
        case "error":
          let errorIssueIndex = -1;
          errorIssueIndex = this.ErrorHealthIssuesGroups.indexOf(
            this.ErrorHealthIssuesGroups.filter(n => n.clusterName === sectors[0] && n.nodeIp === sectors[1])[0]
          );
          if (errorIssueIndex !== undefined && errorIssueIndex !== -1) {
            this.selectedHealthIssue = this.ErrorHealthIssuesGroups?.[errorIssueIndex] ?? {};
            this.displayIssueDetails = true;
          }
          break;
      }
    }
  }

}
