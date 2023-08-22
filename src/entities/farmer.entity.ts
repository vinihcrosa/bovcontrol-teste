import * as bcrypt from 'bcrypt';

export interface IFarmer {
  id?: string;
  farmerName: string;
  farmName: string;
  password: string;
  distanceToFactory: number;
}

export class Farmer {
  private props: IFarmer;

  constructor(props: IFarmer) {
    this.props = props;
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get farmerName() {
    return this.props.farmerName;
  }

  get farmName() {  
    return this.props.farmName;
  }

  get password() {
    return this.props.password;
  }

  get distanceToFactory() {
    return this.props.distanceToFactory;
  }

  toJson(): Omit<IFarmer, 'password'> {
    return {
      id: this.id,
      farmerName: this.farmerName,
      farmName: this.farmName,
      distanceToFactory: this.props.distanceToFactory,
    };
  }

  set id(id: string){
    if(this.props.id) throw new Error('Cannot change farmer id')
    this.props.id = id;
  }

  update(props: Omit<Partial<IFarmer>, 'id'>) {
    this.props = {
      ...this.props,
      ...props,
    };
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}