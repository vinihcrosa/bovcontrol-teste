export interface IDailyMilkProduction {
  id?: string;
  quantity: number;
  date: Date;
  farmerId: string;
  factory: string;
  distance: number;
  price: number;
}

export class DailyMilkProduction {
  constructor(private props: IDailyMilkProduction) {}

  get id(): string | undefined {
    return this.props.id;
  }

  get quantity() {
    return this.props.quantity;
  }

  get date() {
    return this.props.date;
  }

  get farmerId() {
    return this.props.farmerId;
  }

  get factory() {
    return this.props.factory;
  }

  toJson(): IDailyMilkProduction {
    return this.props;
  }
}