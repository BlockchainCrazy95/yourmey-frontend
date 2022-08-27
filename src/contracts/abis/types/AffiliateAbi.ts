/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface AffiliateAbiInterface extends utils.Interface {
  functions: {
    "getAccountName(address)": FunctionFragment;
    "getChildCounts(address)": FunctionFragment;
    "getLevelOnes(address)": FunctionFragment;
    "getParent(address)": FunctionFragment;
    "getParentName(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAccountName(address,string)": FunctionFragment;
    "setParent(address,address,string)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getAccountName"
      | "getChildCounts"
      | "getLevelOnes"
      | "getParent"
      | "getParentName"
      | "owner"
      | "renounceOwnership"
      | "setAccountName"
      | "setParent"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getAccountName",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getChildCounts",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLevelOnes",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getParent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getParentName",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAccountName",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setParent",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAccountName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getChildCounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLevelOnes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getParent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getParentName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAccountName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setParent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "SetAccountName(address,string)": EventFragment;
    "SetParent(address,address,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetAccountName"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetParent"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface SetAccountNameEventObject {
  account: string;
  name: string;
}
export type SetAccountNameEvent = TypedEvent<
  [string, string],
  SetAccountNameEventObject
>;

export type SetAccountNameEventFilter = TypedEventFilter<SetAccountNameEvent>;

export interface SetParentEventObject {
  child: string;
  parent: string;
  name: string;
}
export type SetParentEvent = TypedEvent<
  [string, string, string],
  SetParentEventObject
>;

export type SetParentEventFilter = TypedEventFilter<SetParentEvent>;

export interface AffiliateAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AffiliateAbiInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getAccountName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getChildCounts(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getLevelOnes(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getParent(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getParentName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAccountName(
      _account: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setParent(
      _child: PromiseOrValue<string>,
      _parent: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getAccountName(
    _account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getChildCounts(
    _account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getLevelOnes(
    _account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getParent(
    _account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getParentName(
    _account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAccountName(
    _account: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setParent(
    _child: PromiseOrValue<string>,
    _parent: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAccountName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getChildCounts(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLevelOnes(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getParent(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getParentName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAccountName(
      _account: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setParent(
      _child: PromiseOrValue<string>,
      _parent: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "SetAccountName(address,string)"(
      account?: null,
      name?: null
    ): SetAccountNameEventFilter;
    SetAccountName(account?: null, name?: null): SetAccountNameEventFilter;

    "SetParent(address,address,string)"(
      child?: null,
      parent?: null,
      name?: null
    ): SetParentEventFilter;
    SetParent(child?: null, parent?: null, name?: null): SetParentEventFilter;
  };

  estimateGas: {
    getAccountName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getChildCounts(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLevelOnes(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getParent(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getParentName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAccountName(
      _account: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setParent(
      _child: PromiseOrValue<string>,
      _parent: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAccountName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getChildCounts(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLevelOnes(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getParent(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getParentName(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAccountName(
      _account: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setParent(
      _child: PromiseOrValue<string>,
      _parent: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
