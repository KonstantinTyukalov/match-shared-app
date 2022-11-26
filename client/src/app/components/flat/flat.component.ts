import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import * as UserSelector from '../../store/selectors/user.selectors';
import * as FlatActions from '../../store/actions/flat.actions';

import * as FlatSelector from '../../store/selectors/flat.selectors';
import { combineLatest, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from 'src/app/services/chat.service';
import { Location } from "@angular/common";
import { FlatService } from "../../services/flat.service";
import { FlatComment } from "../../dto/flatComment.dto";

@Component({
    selector: 'app-flat',
    templateUrl: './flat.component.html',
    styleUrls: ['./flat.component.scss']
})
export class FlatComponent implements OnInit, OnDestroy {
    public flat$ = this.store.select(FlatSelector.flat);
    public user$ = this.store.select(UserSelector.user);

    public content = '';

    private subscriptions: Subscription = new Subscription();

    constructor(
        private readonly store: Store,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly chatService: ChatService,
        private readonly location: Location,
        private readonly flatService: FlatService
    ) {
    }

    public ngOnInit(): void {
        this.subscriptions.add(
            this.route.params.subscribe(params => {
                const flatId = params['id'];
                if (flatId) {
                    this.store.dispatch(FlatActions.getFlatById({ id: flatId }));
                }
            }),
        );
    }

    public onBackClick(): void {
        this.location.back();
    }

    public onSendClick(): void {
        this.subscriptions.add(
            combineLatest(
                this.flat$,
                this.user$
            ).subscribe(([flat, user]) => {
                this.flatService.addFlatComment({
                    flat,
                    user,
                    content: this.content
                } as FlatComment)
            })
        )
    }

    public async onUserClick(userId: string | undefined) {
        if (userId) {
            const chat = await this.chatService.tryGetChatWithUser(userId);

            this.router.navigate(['chat', userId]);
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
