export interface IFarmer {
  id?: string;
  farmerName: string;
  farmName: string;
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

  toJson(): IFarmer {
    return {
      id: this.id,
      farmerName: this.farmerName,
      farmName: this.farmName,
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
}