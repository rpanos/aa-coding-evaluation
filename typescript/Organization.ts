import Position from './Position';
import Name from './Name';
import Employee from './Employee';

abstract class Organization {
  private root: Position;
  private nextIdentifier: number;

  constructor(firstIdentifier?: number) {
    this.root = this.createOrganization();
    this.nextIdentifier = firstIdentifier ? firstIdentifier : 1001
  }

  protected abstract createOrganization(): Position;

  printOrganization = (position: Position, prefix: string): string => {
    let str = `${prefix}+-${position}\n`;
    for (const p of position.getDirectReports()) {
      str = str.concat(this.printOrganization(p, `${prefix}  `));
    }
    return str;
  };

  // Hire the given person as an employee in the position that has that title
  // Return the newly filled position or undefined if no position has that title
  hire(person: Name, title: string): Position | undefined {
    // your code here
    const hiredPosition: Position | undefined = this.root.findPosition(title);
    if (hiredPosition) {
      hiredPosition.setEmployee(new Employee( this.nextIdentifier, person));
      this.nextIdentifier++;
    }

    return hiredPosition
  }

  toString = () => this.printOrganization(this.root, '');
}

export default Organization;
