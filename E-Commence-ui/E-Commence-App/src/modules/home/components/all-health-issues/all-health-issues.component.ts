import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cluster } from 'src/modules/shared/interfaces/Cluster';
import { HealthIssueEntityGroup } from 'src/modules/shared/interfaces/HealthIssueEntityGroup';
import { HealthIssueTypeGroup } from 'src/modules/shared/interfaces/HealthIssueTypeGroup';

@Component({
  selector: 'app-all-health-issues',
  templateUrl: './all-health-issues.component.html',
  styleUrls: ['./all-health-issues.component.css']
})
export class AllHealthIssuesComponent implements OnInit {
  nodesHealthIssues: HealthIssueEntityGroup[] = [];
  servicesHealthIssues: HealthIssueEntityGroup[] = [];

  warnningHealthIssuesGroups: HealthIssueTypeGroup[] = [];
  errorHealthIssuesGroups: HealthIssueTypeGroup[] = [];

  clusters: Cluster[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      data => {
        if (data && data["AllClusters"]) {
          if (!data["AllClusters"].hasErrors) {
            this.clusters = data["AllClusters"].data;
            this.mapHealthIssuesByEntity();
            this.mapHealthIssuesByLevel();
          }
        }
      },
      error => console.error("Error: ", error)
    );
  }

  mapHealthIssuesByEntity() {
    this.clusters.forEach(cluster => {
      cluster.nodes.forEach(node => {
        if (node.healthIssues && node.healthIssues.length > 0) {
          this.nodesHealthIssues.push(
            {
              clusterName: cluster.name,
              nodeIp: node.ip,
              healthIssues: node.healthIssues
            }
          );
        }
        node.services.forEach(service => {
          if (service.healthIssues && service.healthIssues.length > 0) {
            this.servicesHealthIssues.push(
              {
                clusterName: cluster.name,
                nodeIp: node.ip,
                serviceName: service.name,
                healthIssues: service.healthIssues
              }
            );
          }
        });
      });
    });
  }

  mapHealthIssuesByLevel() {
    this.clusters.forEach(cluster => {
      cluster.nodes.forEach(node => {
        if (node.healthIssues && node.healthIssues.length > 0) {
          node.healthIssues.forEach(issue => {
            switch (issue.level) {
              case 1:
                this.warnningHealthIssuesGroups.push(
                  {
                    clusterName: cluster.name,
                    nodeIp: node.ip,

                    ...issue
                  }
                );
                break;

              case 2:
                this.errorHealthIssuesGroups.push(
                  {
                    clusterName: cluster.name,
                    nodeIp: node.ip,

                    ...issue
                  }
                );
                break;
            }
          });
        }
        node.services.forEach(service => {
          if (service.healthIssues && service.healthIssues.length > 0) {
            service.healthIssues.forEach(issue => {
              switch (issue.level) {
                case 1:
                  this.warnningHealthIssuesGroups.push(
                    {
                      clusterName: cluster.name,
                      nodeIp: node.ip,

                      ...issue
                    }
                  );
                  break;

                case 2:
                  this.errorHealthIssuesGroups.push(
                    {
                      clusterName: cluster.name,
                      nodeIp: node.ip,

                      ...issue
                    }
                  );
                  break;
              }
            });
          }
        });
      });
    });
  }
}
