import Employee from './Employee';

class Position {
  private directReports: Set<Position> = new Set<Position>();

  constructor(private title: string, private employee?: Employee) { 
  }

  isFilled = (): boolean => !!this.employee;

  getTitle = (): string => this.title;

  setEmployee = (employee: Employee): void => { this.employee = employee; };

  getEmployee = (): Employee | undefined => this.employee;

  addDirectReport = (position: Position): void => {
    if (!position) {
      throw new Error('position cannot be null');
    }
    this.directReports.add(position);
  };

  removePosition = (position): boolean => this.directReports.delete(position);

  getDirectReports = (): Position[] => {
    const reports: Position[] = [];
    this.directReports.forEach(position => reports.push(position));
    return reports;
  };

  findPosition = (soughtTitle: string): Position | undefined => {
    let foundPosition: Position | undefined
    if (this.title == soughtTitle) {
      return this;
    }

    for(let immediateReport of Array.from(this.directReports.values())){
      if (foundPosition) {
        break;
      }

      if (immediateReport.getTitle() === soughtTitle) {
        foundPosition = immediateReport;
      } else {
        foundPosition = immediateReport.findPosition(soughtTitle);
      }
    }

    return foundPosition;
  }

  toString = () => {
    const employee = this.employee ? `: ${this.employee}` : '';
    return `${this.title}${employee}`;
  };
}

export default Position;
